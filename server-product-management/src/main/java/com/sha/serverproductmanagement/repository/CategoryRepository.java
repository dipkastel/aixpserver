package com.sha.serverproductmanagement.repository;

import com.sha.serverproductmanagement.model.DataCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<DataCategory, Long> {
}
