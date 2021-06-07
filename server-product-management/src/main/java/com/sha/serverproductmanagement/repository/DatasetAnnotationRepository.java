package com.sha.serverproductmanagement.repository;

import com.sha.serverproductmanagement.model.DataAnnotation;
import com.sha.serverproductmanagement.model.DataImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DatasetAnnotationRepository extends JpaRepository<DataAnnotation, Long> {
    @Query("SELECT e from DataAnnotation e where e.image_id =?1")
    DataAnnotation findImageAnnotation(Long imageId);
}
