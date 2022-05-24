## database design

### brand_table
----
brand_name: string, not null;

### flavor_table
----
brand_id: id, not null;
flavor_name: string, not null;
notes: string, null;