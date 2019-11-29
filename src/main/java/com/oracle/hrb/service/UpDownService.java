package com.oracle.hrb.service;

import com.oracle.hrb.bean.UpDown;
import com.oracle.hrb.dao.UpDownDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UpDownService {
    @Autowired
    private UpDownDao upDownDao;

    @Transactional
    public void state(UpDown upDown){
    UpDown ud = upDownDao.findByActivityIdAndUserId(upDown);
    if(ud==null){
        upDown.setId(UUID.randomUUID().toString());
        upDownDao.add(upDown);
    }else{
        if(upDown.getState()==ud.getState()){
            ud.setState(0);
        }else{
            ud.setState(upDown.getState());
        }
        upDownDao.update(ud);
    }

    }
}
