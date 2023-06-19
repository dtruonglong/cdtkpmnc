-- Active: 1685711832980@@127.0.0.1@5432@voucher
CREATE TABLE
    vouchers (
        id varchar(255) NOT NULL,
        id_group varchar(255) NOT NULL,
        image varchar(255) NOT NULL,
        game_type varchar(255) NOT NULL,
        store_type varchar(255) NOT NULL,
        code varchar(255) NOT NULL,
        discount integer NOT NULL,
        create_time timestamp default CURRENT_TIMESTAMP NOT NULL,
        expire_time timestamp,
        partner varchar(255) NOT NULL,
        description varchar(1000) NOT NULl,
        link_use_voucher varchar(255) NOT NULL,
        customer varchar(255),
        is_used integer NOT NULL DEFAULT 0,
        is_accepted integer NOT NULL DEFAULT 0,
        latitude real NOT NULL,
        longitude  REAL NOT NULL,
        PRIMARY KEY (code)
    );

CREATE TABLE
    users(
        username varchar(255) NOT NULl,
        password varchar(255) NOT NULL,
        fullname varchar(255) NOT NULL,
        role varchar(255) NOT NULL,
        phone varchar(255) NOT NULL,
        address varchar(255) NOT NULL,
        status VARCHAR(255) DEFAULT 'active',
        PRIMARY KEY(username)
    );

CREATE TABLE
    types(
        name varchar(255) NOT NULL,
        label varchar(255) NOT NULL,
        PRIMARY KEY(name)
    );