-- DATABASE TESTS

begin;
select plan( 4 );

-- CHECK THAT PRIMARY KEYS ARE CORRECT IN EACH TABLE

select col_is_pk( 'enquiries', 'id' );
select col_is_pk( 'fountain_allergens', 'id' );
select col_is_pk( 'fountain_allergens_ratings', 'id' );
select col_is_pk( 'users', 'id' );

select * from finish();
rollback;
