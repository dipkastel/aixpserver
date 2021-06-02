package com.sha.serverproductmanagement.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="dataLicense")
public class DataLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="url")
    private String url;
}


