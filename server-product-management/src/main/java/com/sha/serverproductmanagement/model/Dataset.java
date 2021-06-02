package com.sha.serverproductmanagement.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name="dataset")
public class Dataset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private Long user_id;

    @Column(name="name")
    private String name;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="explanation")
    private String explanation;



}


