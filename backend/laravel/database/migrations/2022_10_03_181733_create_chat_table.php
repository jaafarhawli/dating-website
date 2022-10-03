<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat', function (Blueprint $table) {
            $table->unsignedInteger('sender_user_id');
            $table->unsignedInteger('sent_to_user_id');
            $table->string('message');
            $table->datetime('date');
            $table->timestamps();

            $table->foreign('sender_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('sent_to_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat');
    }
};
