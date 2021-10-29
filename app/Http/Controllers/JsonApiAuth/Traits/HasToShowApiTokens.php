<?php

namespace App\Http\Controllers\JsonApiAuth\Traits;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;
use App\Http\Controllers\JsonApiAuth\Actions\AuthKit;

trait HasToShowApiTokens
{
  /** Here you can customize how to return data on login and register*/
  public function showCredentials($user, int $code = 200, bool $showToken = false): JsonResponse
  {
    $response = [
      'message' => __('json-api-auth.success'),
      'user' => new UserResource($user),
    ];

    if ($showToken) {
      $response['token'] = $this->createToken($user);
    }

    $cookie = cookie('token', $this->createToken($user), 60 * 24 * 365);

    return response()->json($response, $code)->withCookie($cookie);
  }

  protected function createToken(User $user)
  {
    $token = $user->createToken(
      config('json-api-auth.token_id') ?? 'App',
      // Here you can customize the scopes for a new user
      config('json-api-auth.scopes') ?? []
    );

    if (AuthKit::isSanctum()) {
      return $token->plainTextToken;
    }

    return $token->accessToken;
  }
}
