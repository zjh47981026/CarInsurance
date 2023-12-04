package com.synergisticit.domain;

import jakarta.persistence.*;

@Entity
@Table(name ="driver")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long driverId;

    private String name;

    private String driverLicenseNum;

    private String address;

    private Integer age;

    private Integer numOfAccidents;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getNumOfAccidents() {
        return numOfAccidents;
    }

    public void setNumOfAccidents(Integer numOfAccidents) {
        this.numOfAccidents = numOfAccidents;
    }

    public String getDriverLicenseNum() {
        return driverLicenseNum;
    }

    public void setDriverLicenseNum(String driverLicenseNum) {
        this.driverLicenseNum = driverLicenseNum;
    }

    public long getDriverId() {
        return driverId;
    }

    public void setDriverId(long driverId) {
        this.driverId = driverId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

}
