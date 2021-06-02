package com.sha.serverproductmanagement.service;

import com.sha.serverproductmanagement.model.DataImage;
import com.sha.serverproductmanagement.model.Dataset;

import java.util.List;

public interface DatasetService {
    Dataset saveDataset(Dataset dataset);

    Dataset updateDataset(Dataset dataset);

    void deleteDataset(Long datasetId);

    Long numberOfDataset();

    List<Dataset> findAllDatasets(Long userid);

    DataImage saveDatasetImage(DataImage image);

    Object findAllDatasetImages(Long datasetId);
}
