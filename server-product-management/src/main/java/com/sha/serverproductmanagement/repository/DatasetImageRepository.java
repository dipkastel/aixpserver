package com.sha.serverproductmanagement.repository;

import com.sha.serverproductmanagement.model.DataImage;
import com.sha.serverproductmanagement.model.Dataset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DatasetImageRepository extends JpaRepository<DataImage, Long> {
    @Query("SELECT e from DataImage e where e.dataSetDetailId =:datasetId ")
    List<DataImage> findDatasetImages(Long datasetId);
}
