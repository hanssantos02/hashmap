Action	                    Entry count afterward	        Expected reads afterward
Store cat → orange	                1	                            cat → orange
Store dog → brown	                2	                        cat → orange; dog → brown
Store cat → black	                2	                        cat → black; dog → brown

1. The bucket number identifies a location
2. The keys and values
3. Updating cat’s value must leave dog’s value unchanged and keep the entry count at 2.

**Growth

1. the count and capacity won't change when updating an existing key
2. count should increase by 1, then capacity should be updated from 16 to 32
3. q will be stuck in bucket 1, and it will be missed in bucket 17
4. key-value pairs should not change and also the count