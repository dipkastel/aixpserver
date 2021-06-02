package com.sha.serverproductmanagement.repository;

import com.sha.serverproductmanagement.model.Dataset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatasetRepository extends JpaRepository<Dataset, Long> {
}
