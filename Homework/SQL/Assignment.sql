
1a, Display the first and last names of all actors from the table `actor`.  
select first_name, Last_name from actor;

1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`.

USE sakila;
select concat(first_name,"  ",last_name) as Actor_Name from actor;

2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." 
What is one query would you use to obtain this information?

select actor_id, first_name, last_name from actor 
where first_name like 'Joe%' ;

2b. Find all actors whose last name contain the letters `GEN`:

select * from actor where last_name like '%GEN%';

 2c. Find all actors whose last names contain the letters `LI`. 
 This time, order the rows by last name and first name, in that order:
 
 select first_name,last_name 
 from actor 
 where last_name like '%LI%'
 group by last_name, first_name;

2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China:

select country_id, country from country where country IN ('Afghanistan','Bangladesh','China');

3a. Add a `middle_name` column to the table `actor`. Position it between `first_name` and `last_name`. Hint: you will need to specify the data type.

ALTER TABLE actor 
ADD COLUMN middle_name VARCHAR(25) AFTER first_name;
  	
3b. You realize that some of these actors have tremendously long last names. Change the data type of the `middle_name` column to `blobs`.

CHANGE COLUMN middle_name blobs AFTER first_name;
UPDATE COLUMN middle_name middle_name BLOB AFTER first_name;

3c. Now delete the `middle_name` column.

ALTER TABLE actor 
DROP COLUMN middle_name;

4a. List the last names of actors, as well as how many actors have that last name.

select last_name, count(last_name) as cnt_last_nm
from actor 
group by last_name; 
  	
4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors

select last_name, count(last_name) as cnt_last_nm 
from actor 
group by last_name
having cnt_last_nm >= 2;
  	
4c. Oh, no! The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`, the name of 
Harpo's second cousin's husband''s yoga teacher. Write a query to fix the record.

update actor 
SET first_name = 'HARPO'
where first_name = 'GROUCHO'  and last_name = 'WILLIAMS' 


  	
4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the correct name after all! In a single query, 
if the first name of the actor is currently `HARPO`, change it to `GROUCHO`. Otherwise, change the first name to `MUCHO GROUCHO`, 
as that is exactly what the actor will be with the grievous error. BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO `MUCHO GROUCHO`, 
HOWEVER! (Hint: update the record using a unique identifier.)

update actor 
SET first_name = IF(first_name= 'HARPO','GROUCHO','MUCHO GROUCHO')
where last_name = 'WILLIAMS' and first_name = 'HARPO';
  	
* 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?

SHOW CREATE TABLE address;

# Table, Create Table
'address', 'CREATE TABLE `address` (\n  `address_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
\n  `address` varchar(50) NOT NULL,\n  `address2` varchar(50) DEFAULT NULL,\n  `district` varchar(20) NOT NULL,
\n  `city_id` smallint(5) unsigned NOT NULL,\n  `postal_code` varchar(10) DEFAULT NULL,\n  `phone` varchar(20) NOT NULL,
\n  `location` geometry NOT NULL,\n  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
\n  PRIMARY KEY (`address_id`),\n  KEY `idx_fk_city_id` (`city_id`),\n  SPATIAL KEY `idx_location` (`location`),
\n  CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE\n) ENGINE=InnoDB AUTO_INCREMENT=606 DEFAULT CHARSET=utf8'


* 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`:

select first_name, last_name, address
from staff
join address  on staff.address_id=address.address_id

or 

select sta.first_name, sta.last_name, addy.address
from staff sta
join address  addy on sta.address_id=addy.address_id


* 6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`. 

select staff.first_name, staff.last_name,payment.staff_id,payment.payment_date, count(payment.amount) 
from staff
join payment on staff.staff_id=payment.staff_id
where payment_date = '2005-08%'
group by staff.first_name, staff.last_name,payment.staff_id,payment.payment_date



select payment.staff_id, sum(payment.amount) as 'Total Sales Aug 2005'
from payment
join staff on payment.staff_id=staff.staff_id
where payment_date like  '2005-08%'
group by staff_id

 or

SELECT staff_id AS 'Staff ID', SUM(amount) AS 'Total Amount Aug 2005' 
FROM payment 
WHERE staff_id IN 
(
    SELECT staff_id FROM staff
) 
AND payment_date LIKE '2005-08%' 
GROUP BY staff_id;

    
6c. List each film and the number of actors who are listed for that film. Use tables `film_actor` and `film`. Use inner join.

select film.title, count(film_actor.actor_id)
from film
inner join film_actor on film.film_id=film_actor.film_id
group by film.title;

  	
* 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?

select film.title, count(film.title) 
from film 
inner join 
inventory  on film.film_id=inventory.film_id
where film.title like '%Hunchback_Impossible%'
group by film.title


* 6e. Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer. List the customers alphabetically by last name:
select cust.last_name,cust.first_name,sum(pay.amount) as 'Total Amount Paid'
from customer as cust
inner join payment as pay on cust.customer_id=pay.customer_id
group by cust.last_name desc, cust.first_name


select last_name,first_name,sum(amount) as 'Total Amount Paid'
from customer as cust
inner join payment as pay on cust.customer_id=pay.customer_id
group by last_name,first_name

  ```
  	![Total amount paid](Images/total_payment.png)
  ```

* 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films 
starting with the letters `K` and `Q` have also soared in popularity. Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English. 

select title
from film
where (title like 'K%' or title like 'Q%' ) or language_id in (select language_id from language where name = 'English')


* 7b. Use subqueries to display all actors who appear in the film `Alone Trip`.

select actor_id, first_name,last_name from actor 
where (

select actor_id, film_id from film_actor

select film_id, title from film where title like '%Alone Trip%' and (select actor_id, film_id from film_actor where (select actor_id, first_name,last_name from actor ))

select first_name,last_name 
from actor 
where actor_id IN 
(
		select actor_id 
        from film_actor 
        where film_id IN 
        (
			select film_id 
            from film 
            where title = 'Alone Trip'
		)
);


* 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.

SELECT A.first_name,A.last_name,A.email 
FROM customer A
JOIN address B ON B.address_id=A.address_id
JOIN city C ON C.city_id=B.city_id
JOIN country D ON D.country_id=C.country_id
where country = 'canada';

* 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as famiy films.



SELECT title 
FROM film
WHERE film_id IN 
(
	SELECT film_id 
    FROM film_category
    WHERE category_id IN
    (
		SELECT category_id
        FROM category 
        WHERE NAME = 'family'
	)
);
    

* 7e. Display the most frequently rented movies in descending order.

SELECT title, 
(
    SELECT COUNT(*) 
    FROM inventory 
    WHERE film.film_id = inventory.film_id
) AS 'rental count' 
FROM film 
WHERE film_id IN 
(
    SELECT film_id 
    FROM inventory 
    WHERE inventory_id IN 
    (
        SELECT inventory_id 
        FROM rental
	)
) 
ORDER BY `rental count` DESC;

  	
* 7f. Write a query to display how much business, in dollars, each store brought in.

SELECT staff_id AS 'Store', SUM(amount) AS 'Profits' 
FROM payment 
WHERE staff_id IN 
(
    SELECT manager_staff_id AS staff_id 
    FROM store
) 
GROUP BY staff_id;

* 7g. Write a query to display for each store its store ID, city, and country.

SELECT store_id, city, country 
FROM country co 
JOIN city 
ON co.country_id = city.country_id 
JOIN address a 
ON city.city_id = a.city_id 
JOIN store s 
ON  a.address_id = s.address_id;
    
* 7h. List the top five genres in gross revenue in descending order. 
(**Hint**: you may need to use the following tables: category, film_category, inventory, payment, and rental.)

SELECT c.name, SUM(amount) AS 'gross_revenue' 
FROM category c 
JOIN film_category fc 
ON c.category_id = fc.category_id 
JOIN inventory i ON fc.film_id = i.film_id 
JOIN rental r ON i.inventory_id = r.inventory_id 
JOIN payment p ON r.rental_id = p.rental_id 
GROUP BY name 
ORDER BY gross_revenue DESC LIMIT 5;

* 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. 
Use the solution from the problem above to create a view. If you haven''t solved 7h, you can substitute another query to create a view.

CREATE VIEW Top_Five_Genre AS 
SELECT c.name, SUM(amount) AS 'gross_revenue' 
FROM category c 
JOIN film_category fc ON c.category_id = fc.category_id 
JOIN inventory i ON fc.film_id = i.film_id 
JOIN rental r ON i.inventory_id = r.inventory_id 
JOIN payment p ON r.rental_id = p.rental_id 
GROUP BY name 
ORDER BY gross_revenue DESC LIMIT 5;
  	
* 8b. How would you display the view that you created in 8a?

SELECT * FROM Top_Five_Genre;

* 8c. You find that you no longer need the view `Top_Five_Genre`. Write a query to delete it.

DROP VIEW Top_Five_Genre;
