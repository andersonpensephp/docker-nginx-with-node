use nodedb;

CREATE TABLE IF NOT EXISTS people(
	id int not null AUTO_INCREMENT, 
	name varchar(255), 
	primary key(id)
);