package com.sha.serverproductmanagement.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="dataImage")
public class DataImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="licenseId")
    private Long licenseId;

    @Column(name="dataSetDetailId")
    private Long dataSetDetailId;

    @Column(name="name")
    private String name;

    @Column(name="imageUrl")
    private String imageUrl;

    @Column(name="flickrUrl")
    private String flickrUrl;

    @Column(name="dateCaptured")
    private LocalDateTime dateCaptured;

}

