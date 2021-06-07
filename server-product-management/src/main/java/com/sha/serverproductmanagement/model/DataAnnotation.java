package com.sha.serverproductmanagement.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="dataAnnotation")
public class DataAnnotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="category_id")
    private String category_id;

    @Column(name="is_crowd")
    private String is_crowd;

    @Column(name="segmentation",columnDefinition="TEXT")
    private String segmentation;

    @Column(name="image_id")
    private Long image_id;

    @Column(name="area")
    private double area;



}


