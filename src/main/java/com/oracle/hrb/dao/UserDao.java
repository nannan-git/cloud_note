package com.oracle.hrb.dao;

import com.oracle.hrb.bean.User;

import java.util.List;

public interface UserDao {
	void add(User user);
	void update(User user);
	User findById(String id);
	User findByName(String name);
	User findByNickName(String name);
}
