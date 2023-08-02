create table meter
(
    id  integer not null
        constraint meter_pk
            primary key,
    lat real    not null,
    lon real    not null
);

