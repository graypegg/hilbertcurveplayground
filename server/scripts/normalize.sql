-- Create unique list of rain meters
insert into meter(id, lat, lon)
    select id, latitude, longitude
    from precipitation
    group by id;

-- Create list of meter readings, replace meter ID with foreign key of meter table
insert into reading(rainfall, created_at, meter_id)
    select coalesce(rainfall, 0), datetime("date") as created_at, m.id as meter_id from precipitation p
    join meter m on m.id = p.id;