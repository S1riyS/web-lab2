package ru.s1riys.lab2.models;

import java.util.ArrayList;
import java.util.List;

public class ResultsListBean {
    private List<Result> records;

    public ResultsListBean() {
        records = new ArrayList<>();
    }

    public void addResult(Result record) {
        records.add(record);
    }

    public List<Result> getResults() {
        return records;
    }
}
