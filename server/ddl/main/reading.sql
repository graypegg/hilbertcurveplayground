create table reading
(
    id         integer not null
        constraint readings_pk
            primary key autoincrement,
    rainfall   integer not null,
    created_at date    not null,
    meter_id   integer not null
        constraint reading_meter_id_fk
            references meter
);

create unique index reading_meter_id_created_at_uindex
    on reading (meter_id, created_at);

