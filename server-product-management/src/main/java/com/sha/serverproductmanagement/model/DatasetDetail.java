package com.sha.serverproductmanagement.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="datasetDetail")
public class DatasetDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="dataset_id")
    private Long datasetId;

    @Column(name="dataset_version")
    private Long datasetVersion;

    @Column(name="name")
    private String name;

    @Column(name="explanation")
    private String explanation;

    @Column(name="is_valid")
    private boolean isValid;

    @Column(name="has_tag")
    private boolean hasTag;

    @Column(name="date_added")
    private LocalDateTime dateAdded;


}


