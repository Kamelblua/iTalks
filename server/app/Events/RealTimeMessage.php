<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class RealTimeMessage implements ShouldBroadcast
{
    use SerializesModels;

    public string $message;
    public string $channel;

    public function __construct(string $message, string $channel)
    {
        $this->message = $message;
        $this->channel = $channel;
    }

    public function broadcastOn(): Channel
    {
        return new Channel($this->channel);
    }
}