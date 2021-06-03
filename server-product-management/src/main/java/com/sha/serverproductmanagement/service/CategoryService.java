package com.sha.serverproductmanagement.service;


import com.sha.serverproductmanagement.model.DataCategory;

import java.util.List;

public interface CategoryService {
    DataCategory saveCategory(DataCategory dataset);

    DataCategory updateCategory(DataCategory dataset);

    void deleteCategory(Long categoryId);

    List<DataCategory> findAllCategories();
}
