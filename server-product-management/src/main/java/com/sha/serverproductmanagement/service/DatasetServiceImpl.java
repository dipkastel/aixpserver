package com.sha.serverproductmanagement.service;

import com.sha.serverproductmanagement.model.DataAnnotation;
import com.sha.serverproductmanagement.model.DataImage;
import com.sha.serverproductmanagement.model.Dataset;
import com.sha.serverproductmanagement.repository.DatasetAnnotationRepository;
import com.sha.serverproductmanagement.repository.DatasetImageRepository;
import com.sha.serverproductmanagement.repository.DatasetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DatasetServiceImpl implements DatasetService {

    @Autowired
    private DatasetRepository datasetRepository;
    @Autowired
    private DatasetImageRepository datasetImageRepository;
    @Autowired
    private DatasetAnnotationRepository datasetAnnotationRepository;

    @Override
    public Dataset saveDataset(Dataset dataset) {
        datasetRepository.save(dataset);
        return dataset;
    }

    @Override
    public Dataset updateDataset(Dataset dataset) {
        return datasetRepository.save(dataset);
    }

    @Override
    public void deleteDataset(Long datasetId) {
        datasetRepository.deleteById(datasetId);
    }

    @Override
    public Long numberOfDataset() {
        return datasetRepository.count();
    }

    @Override
    public List<Dataset> findAllDatasets(Long userId) {
        return datasetRepository.findAll().stream()
                .filter(p -> p.getUser_id().equals(userId)).collect(Collectors.toList());
    }

    @Override
    public DataImage saveDatasetImage(DataImage image) {
        return datasetImageRepository.save(image);
    }

    @Override
    public List<DataImage> findAllDatasetImages(Long datasetId) {
        return datasetImageRepository.findDatasetImages(datasetId);
    }

    @Override
    public DataAnnotation findImageAnnotation(Long imageId) {
        return datasetAnnotationRepository.findImageAnnotation(imageId);
    }

    @Override
    public DataAnnotation saveAnnotation(DataAnnotation annotation) {
        return datasetAnnotationRepository.save(annotation);
    }

    @Override
    public void deleteAnnotations(Long image_id) {
        DataAnnotation dataAnnotation = findImageAnnotation(image_id);
        datasetAnnotationRepository.delete(dataAnnotation);
    }
}
