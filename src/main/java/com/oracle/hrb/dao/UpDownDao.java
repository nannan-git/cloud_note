package com.oracle.hrb.dao;

import com.oracle.hrb.bean.UpDown;

public interface UpDownDao {
    void add(UpDown upDown);
    void update(UpDown upDown);
    UpDown findByActivityIdAndUserId(UpDown upDown);
    int countState(UpDown upDown);
}
