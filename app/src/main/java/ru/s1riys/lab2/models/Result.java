package ru.s1riys.lab2.models;

import java.util.Date;
import java.text.SimpleDateFormat;

public class Result {
    private final float x;
    private final float y;
    private final float r;
    private final boolean isHit;
    private final String createdAt;
    private final String scriptTime;

    public Result(float x, float y, float r, long scriptTime) {
        this.createdAt = formatDate(System.currentTimeMillis());
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = checkHit(x, y, r);
        this.scriptTime = formatTime(scriptTime);
    }

    public static boolean checkHit(float x, float y, float r) {
        if (x >= 0 && y >= 0) {
            return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2);
        }
        if (x <= 0 && y <= 0) {
            return y >= -x - r;
        }
        if (x >= 0 && y <= 0) {
            return (x <= r) && (y >= -r);
        }
        return false;
    }

    public float getR() {
        return r;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public boolean isHit() {
        return isHit;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getScriptTime() {
        return scriptTime;
    }

    private String formatDate(long dateInMillis) {
        Date date = new Date(dateInMillis);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        return dateFormat.format(date);
    }

    private String formatTime(long milliseconds) {
        int hours = (int) (milliseconds / (60 * 60 * 1000));
        int minutes = (int) (milliseconds / (60 * 1000)) % 60;
        int seconds = (int) (milliseconds / 1000) % 60;
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }
}