package com.sha.serverproductmanagement.service;

import com.sha.serverproductmanagement.model.DataCategory;
import com.sha.serverproductmanagement.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public DataCategory saveCategory(DataCategory category) {
        categoryRepository.save(category);
        return category;
    }

    @Override
    public DataCategory updateCategory(DataCategory category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public List<DataCategory> findAllCategories() {
        return categoryRepository.findAll();
    }
}
