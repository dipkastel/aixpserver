package com.sha.serverproductmanagement.controller;

import com.sha.serverproductmanagement.jwt.JwtTokenProvider;
import com.sha.serverproductmanagement.model.DataCategory;
import com.sha.serverproductmanagement.model.DataImage;
import com.sha.serverproductmanagement.model.Dataset;
import com.sha.serverproductmanagement.model.User;
import com.sha.serverproductmanagement.service.CategoryService;
import com.sha.serverproductmanagement.service.DatasetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@RestController
public class DatasetController {

    @Autowired
    private DatasetService datasetService;

    @Autowired
    private CategoryService categoryService;


    @Autowired
    private JwtTokenProvider tokenProvider;


/*dataset*/
    @GetMapping("/api/dataset/getall/")
    public ResponseEntity<?> getUserDatasets(){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String token = request.getHeader("Authorization").split(" ")[1];
        User user = tokenProvider.getCurrentUser(token);
        return new ResponseEntity<>(datasetService.findAllDatasets(user.getId()), HttpStatus.OK);
    }

    @PostMapping("/api/dataset/add")
    public ResponseEntity<?> addDatasets(@RequestBody Dataset dataset){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String token = request.getHeader("Authorization").split(" ")[1];
        User user = tokenProvider.getCurrentUser(token);
        dataset.setUser_id(user.getId());
        return new ResponseEntity<>(datasetService.saveDataset(dataset), HttpStatus.OK);
    }
    @GetMapping("/api/dataset/delete/{datasetId}")
    public ResponseEntity<?> addDatasets(@PathVariable Long datasetId){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String token = request.getHeader("Authorization").split(" ")[1];
        User user = tokenProvider.getCurrentUser(token);
        datasetService.deleteDataset(datasetId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
/*image*/
    @PostMapping("/api/dataset/addimage")
    public ResponseEntity<?> addDatasetsImage(@RequestBody DataImage image){
        return new ResponseEntity<>(datasetService.saveDatasetImage(image), HttpStatus.OK);
    }

    @GetMapping("/api/dataset/getDatasetImages/{datasetId}")
    public ResponseEntity<?> getDatasetImages(@PathVariable Long datasetId){
        return new ResponseEntity<>(datasetService.findAllDatasetImages(datasetId), HttpStatus.OK);
    }
/*categories*/
    @GetMapping("/api/dataset/getallcategories/")
    public ResponseEntity<?> getallcategories(){
        return new ResponseEntity<>(categoryService.findAllCategories(), HttpStatus.OK);
    }

    @PostMapping("/api/dataset/addcategorie/")
    public ResponseEntity<?> addcategories(@RequestBody DataCategory category){
        return new ResponseEntity<>(categoryService.saveCategory(category), HttpStatus.OK);
    }
    @GetMapping("/api/dataset/deleteCategorie/{categoryId}")
    public ResponseEntity<?> deleteCategorie(@PathVariable Long categoryId){
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
