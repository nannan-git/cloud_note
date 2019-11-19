package com.oracle.hrb.test;

import com.oracle.hrb.util.Md5Util;
import org.junit.Test;

import java.util.UUID;

public class TestMD5UUID {
	@Test
	public void testMD5 (){
		//md5测试密码加密，目前可破解
		//为了安全起见可以多加几次密 或者使用sha-256加盐（加盐后不可破解）
		String password ="123456";
		password = Md5Util.md5(password);
		System.out.println(password);
	}
	@Test
	public void testUUID(){
		String id= UUID.randomUUID().toString();
		id = id.replace("-","");
		System.out.println(id);
	}
}
