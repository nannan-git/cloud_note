package com.oracle.hrb.bean;

import java.util.Date;

public class Notebook {
    private String id;
    private String username;
    private String notebookTypeId;
    private String name;
    private Date createTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNotebookTypeId() {
        return notebookTypeId;
    }

    public void setNotebookTypeId(String notebookTypeId) {
        this.notebookTypeId = notebookTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Notebook{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", notebookTypeId='" + notebookTypeId + '\'' +
                ", name='" + name + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
