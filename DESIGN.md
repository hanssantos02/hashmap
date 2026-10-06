Action	                    Entry count afterward	        Expected reads afterward
Store cat → orange	                1	                            cat → orange
Store dog → brown	                2	                        cat → orange; dog → brown
Store cat → black	                2	                        cat → black; dog → brown

1. The bucket number identifies a location
2. The keys and values
3. Updating cat’s value must leave dog’s value unchanged and keep the entry count at 2.