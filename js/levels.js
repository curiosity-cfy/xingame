/**
 * 推箱子关卡数据 —— 来自推箱子社区经典关卡集 Microban
 * Puzzle layouts from the Microban level set by David W. Skinner
 * (April 2000, 155 puzzles, freely distributable with credit).
 * Source: http://users.bentonrea.com/~sasquatch/sokoban/
 *
 * Format (XSB):
 *   #  wall        (space) floor
 *   .  target      $  box
 *   *  box on target
 *   @  player      +  player on target
 */
export const LEVELS = [
  {
    name: "Microban 1",
    author: 'David W. Skinner',
    map: `####
# .#
#  ###
#*@  #
#  $ #
#  ###
####`
  },
  {
    name: "Microban 2",
    author: 'David W. Skinner',
    map: `######
#    #
# #@ #
# $* #
# .* #
#    #
######`
  },
  {
    name: "Microban 3",
    author: 'David W. Skinner',
    map: `  ####
###  ####
#     $ #
# #  #$ #
# . .#@ #
#########`
  },
  {
    name: "Microban 4",
    author: 'David W. Skinner',
    map: `########
#      #
# .**$@#
#      #
#####  #
    ####`
  },
  {
    name: "Microban 5",
    author: 'David W. Skinner',
    map: ` #######
 #     #
 # .$. #
## $@$ #
#  .$. #
#      #
########`
  },
  {
    name: "Microban 6",
    author: 'David W. Skinner',
    map: `###### #####
#    ###   #
# $$     #@#
# $ #...   #
#   ########
#####`
  },
  {
    name: "Microban 7",
    author: 'David W. Skinner',
    map: `#######
#     #
# .$. #
# $.$ #
# .$. #
# $.$ #
#  @  #
#######`
  },
  {
    name: "Microban 8",
    author: 'David W. Skinner',
    map: `  ######
  # ..@#
  # $$ #
  ## ###
   # #
   # #
#### #
#    ##
# #   #
#   # #
###   #
  #####`
  },
  {
    name: "Microban 9",
    author: 'David W. Skinner',
    map: `#####
#.  ##
#@$$ #
##   #
 ##  #
  ##.#
   ###`
  },
  {
    name: "Microban 10",
    author: 'David W. Skinner',
    map: `      #####
      #.  #
      #.# #
#######.# #
# @ $ $ $ #
# # # # ###
#       #
#########`
  },
  {
    name: "Microban 11",
    author: 'David W. Skinner',
    map: `  ######
  #    #
  # ##@##
### # $ #
# ..# $ #
#       #
#  ######
####`
  },
  {
    name: "Microban 12",
    author: 'David W. Skinner',
    map: `#####
#   ##
# $  #
## $ ####
 ###@.  #
  #  .# #
  #     #
  #######`
  },
  {
    name: "Microban 13",
    author: 'David W. Skinner',
    map: `####
#. ##
#.@ #
#. $#
##$ ###
 # $  #
 #    #
 #  ###
 ####`
  },
  {
    name: "Microban 14",
    author: 'David W. Skinner',
    map: `#######
#     #
# # # #
#. $*@#
#   ###
#####`
  },
  {
    name: "Microban 15",
    author: 'David W. Skinner',
    map: `     ###
######@##
#    .* #
#   #   #
#####$# #
    #   #
    #####`
  },
  {
    name: "Microban 16",
    author: 'David W. Skinner',
    map: ` ####
 #  ####
 #     ##
## ##   #
#. .# @$##
#   # $$ #
#  .#    #
##########`
  },
  {
    name: "Microban 17",
    author: 'David W. Skinner',
    map: `#####
# @ #
#...#
#$$$##
#    #
#    #
######`
  },
  {
    name: "Microban 18",
    author: 'David W. Skinner',
    map: `#######
#     #
#. .  #
# ## ##
#  $ #
###$ #
  #@ #
  #  #
  ####`
  },
  {
    name: "Microban 19",
    author: 'David W. Skinner',
    map: `########
#   .. #
#  @$$ #
##### ##
   #  #
   #  #
   #  #
   ####`
  },
  {
    name: "Microban 20",
    author: 'David W. Skinner',
    map: `#######
#     ###
#  @$$..#
#### ## #
  #     #
  #  ####
  #  #
  ####`
  },
  {
    name: "Microban 21",
    author: 'David W. Skinner',
    map: `####
#  ####
# . . #
# $$#@#
##    #
 ######`
  },
  {
    name: "Microban 22",
    author: 'David W. Skinner',
    map: `#####
#   ###
#. .  #
#   # #
## #  #
 #@$$ #
 #    #
 #  ###
 ####`
  },
  {
    name: "Microban 23",
    author: 'David W. Skinner',
    map: `#######
#  *  #
#     #
## # ##
 #$@.#
 #   #
 #####`
  },
  {
    name: "Microban 24",
    author: 'David W. Skinner',
    map: `# #####
  #   #
###$$@#
#   ###
#     #
# . . #
#######`
  },
  {
    name: "Microban 25",
    author: 'David W. Skinner',
    map: ` ####
 #  ###
 # $$ #
##... #
#  @$ #
#   ###
#####`
  },
  {
    name: "Microban 26",
    author: 'David W. Skinner',
    map: ` #####
 # @ #
 #   #
###$ #
# ...#
# $$ #
###  #
  ####`
  },
  {
    name: "Microban 27",
    author: 'David W. Skinner',
    map: `######
#   .#
# ## ##
#  $$@#
# #   #
#.  ###
#####`
  },
  {
    name: "Microban 28",
    author: 'David W. Skinner',
    map: `#####
#   #
# @ #
# $$###
##. . #
 #    #
 ######`
  },
  {
    name: "Microban 29",
    author: 'David W. Skinner',
    map: `     #####
     #   ##
     #    #
 ######   #
##     #. #
# $ $ @  ##
# ######.#
#        #
##########`
  },
  {
    name: "Microban 30",
    author: 'David W. Skinner',
    map: `####
#  ###
# $$ #
#... #
# @$ #
#   ##
#####`
  },
  {
    name: "Microban 31",
    author: 'David W. Skinner',
    map: `  ####
 ##  #
##@$.##
# $$  #
# . . #
###   #
  #####`
  },
  {
    name: "Microban 32",
    author: 'David W. Skinner',
    map: ` ####
##  ###
#     #
#.**$@#
#   ###
##  #
 ####`
  },
  {
    name: "Microban 33",
    author: 'David W. Skinner',
    map: `#######
#. #  #
#  $  #
#. $#@#
#  $  #
#. #  #
#######`
  },
  {
    name: "Microban 34",
    author: 'David W. Skinner',
    map: `  ####
###  ####
#       #
#@$***. #
#       #
#########`
  },
  {
    name: "Microban 35",
    author: 'David W. Skinner',
    map: `  ####
 ##  #
 #. $#
 #.$ #
 #.$ #
 #.$ #
 #. $##
 #   @#
 ##   #
  #####`
  },
  {
    name: "Microban 36",
    author: 'David W. Skinner',
    map: `####
#  ############
# $ $ $ $ $ @ #
# .....       #
###############`
  },
  {
    name: "Microban 37",
    author: 'David W. Skinner',
    map: `      ###
##### #.#
#   ###.#
#   $ #.#
# $  $  #
#####@# #
    #   #
    #####`
  },
  {
    name: "Microban 38",
    author: 'David W. Skinner',
    map: `##########
#        #
# ##.### #
# # $$ . #
# . @$## #
#####    #
    ######`
  },
  {
    name: "Microban 39",
    author: 'David W. Skinner',
    map: `#####
#   ####
# # # .#
#    $ ###
### #$.  #
#   #@   #
# # ######
#   #
#####`
  },
  {
    name: "Microban 40",
    author: 'David W. Skinner',
    map: ` #####
 #   #
##   ##
# $$$ #
# .+. #
#######`
  },
  {
    name: "Microban 41",
    author: 'David W. Skinner',
    map: `#######
#     #
#@$$$ ##
#  #...#
##    ##
 ######`
  },
  {
    name: "Microban 42",
    author: 'David W. Skinner',
    map: `   ####
   #  #
   #@ #
####$.#
#   $.#
# # $.#
#    ##
######`
  },
  {
    name: "Microban 43",
    author: 'David W. Skinner',
    map: `     ####
     # @#
     #  #
###### .#
#   $  .#
#  $$# .#
#    ####
###  #
  ####`
  },
  {
    name: "Microban 44",
    author: 'David W. Skinner',
    map: `#####
#@$.#
#####`
  },
  {
    name: "Microban 45",
    author: 'David W. Skinner',
    map: `######
#... #
#  $ #
# #$##
#  $ #
#  @ #
######`
  },
  {
    name: "Microban 46",
    author: 'David W. Skinner',
    map: ` ######
##    #
#  ## #
# # $ #
#  * .#
## #@##
 #   #
 #####`
  },
  {
    name: "Microban 47",
    author: 'David W. Skinner',
    map: `  #######
###     #
# $ $   #
# ### #####
# @ . .   #
#   ###   #
##### #####`
  },
  {
    name: "Microban 48",
    author: 'David W. Skinner',
    map: `######
#  @ #
#  # ##
# .#  ##
# .$$$ #
# .#   #
####   #
   #####`
  },
  {
    name: "Microban 49",
    author: 'David W. Skinner',
    map: `######
# @  #
# $# #
# $  #
# $ ##
### ####
 #  #  #
 #...  #
 #     #
 #######`
  },
  {
    name: "Microban 50",
    author: 'David W. Skinner',
    map: `  ####
###  #####
#  $  @..#
# $    # #
### #### #
  #      #
  ########`
  },
  {
    name: "Microban 51",
    author: 'David W. Skinner',
    map: `####
#  ###
#    ###
#  $*@ #
### .# #
  #    #
  ######`
  },
  {
    name: "Microban 52",
    author: 'David W. Skinner',
    map: `  ####
### @#
#  $ #
#  *.#
#  *.#
#  $ #
###  #
  ####`
  },
  {
    name: "Microban 53",
    author: 'David W. Skinner',
    map: ` #####
##. .##
# * * #
#  #  #
# $ $ #
## @ ##
 #####`
  },
  {
    name: "Microban 54",
    author: 'David W. Skinner',
    map: `      ######
      #    #
  ##### .  #
###  ###.  #
# $  $  . ##
# @$$ # . #
##    #####
 ######`
  },
  {
    name: "Microban 55",
    author: 'David W. Skinner',
    map: `########
# @ #  #
#      #
#####$ #
    #  ###
 ## #$ ..#
 ## #  ###
    ####`
  },
  {
    name: "Microban 56",
    author: 'David W. Skinner',
    map: `#####
#   ###
#  $  #
##* . #
 #   @#
 ######`
  },
  {
    name: "Microban 57",
    author: 'David W. Skinner',
    map: `  ####
  #  #
  #@ #
  #  #
### ####
#    * #
#  $   #
#####. #
    ####`
  },
  {
    name: "Microban 58",
    author: 'David W. Skinner',
    map: `####
#  ####
#.*$  #
# .$# #
## @  #
 #   ##
 #####`
  },
  {
    name: "Microban 59",
    author: 'David W. Skinner',
    map: `############
#          #
# ####### @##
# #         #
# #  $   #  #
# $$ #####  #
###  # # ...#
  #### #    #
       ######`
  },
  {
    name: "Microban 60",
    author: 'David W. Skinner',
    map: ` #########
 #       #
##@##### #
#  #   # #
#  #   $.#
#  ##$##.#
##$##  #.#
#   $  #.#
#   #  ###
########`
  },
  {
    name: "Microban 61",
    author: 'David W. Skinner',
    map: `########
#      #
# #### #
# #...@#
# ###$###
# #     #
#  $$ $ #
####   ##
   #.###
   ###`
  },
  {
    name: "Microban 62",
    author: 'David W. Skinner',
    map: `   ##########
####    ##  #
#  $$$....$@#
#      ###  #
#   #### ####
#####`
  },
  {
    name: "Microban 63",
    author: 'David W. Skinner',
    map: `#####   ####
#   ##### .#
#       $  ########
###  #### .$    @ #
  #  #  #  ####   #
  ####  ####  #####`
  },
  {
    name: "Microban 64",
    author: 'David W. Skinner',
    map: ` ######
##    #
#   $ #
#  $$ #
### .#####
  ##.# @ #
   #.  $ #
   #. ####
   ####`
  },
  {
    name: "Microban 65",
    author: 'David W. Skinner',
    map: `  ######
  #    #
  #  $ #
 ####$ #
## $ $ #
#....# ##
#     @ #
##  #   #
 ########`
  },
  {
    name: "Microban 66",
    author: 'David W. Skinner',
    map: `   ###
   #@#
 ###$###
##  .  ##
#  # #  #
# #   # #
# #   # #
# #   # #
#  # #  #
## $ $ ##
 ##. .##
  #   #
  #   #
  #####`
  },
  {
    name: "Microban 67",
    author: 'David W. Skinner',
    map: `#####
#   ##
# #  #
#@$*.##
##  . #
 # $# #
 ##   #
  #####`
  },
  {
    name: "Microban 68",
    author: 'David W. Skinner',
    map: ` ####
 #  ######
##    $  #
# .# $   #
# .#$#####
# .@ #
######`
  },
  {
    name: "Microban 69",
    author: 'David W. Skinner',
    map: `####  ####
#  ####  #
#  #  #  #
#  #    $##
#  . .#$  #
#@ ## # $ #
#   . #   #
###########`
  },
  {
    name: "Microban 70",
    author: 'David W. Skinner',
    map: `#####
# @ ####
#      #
# $ $$ #
##$##  #
#   ####
# ..  #
##..  #
 ###  #
   ####`
  },
  {
    name: "Microban 71",
    author: 'David W. Skinner',
    map: `###########
#     #   ###
# $@$ # .  .#
# ## ### ## #
# #       # #
# #   #   # #
# ######### #
#           #
#############`
  },
  {
    name: "Microban 72",
    author: 'David W. Skinner',
    map: `  ####
 ##  #####
 #  $  @ #
 #  $#   #
#### #####
#  #   #
#    $ #
# ..#  #
#  .####
#  ##
####`
  },
  {
    name: "Microban 73",
    author: 'David W. Skinner',
    map: `####
#  #####
# $$ $ #
#      #
## ## ##
#...#@#
# ### ##
#      #
#  #   #
########`
  },
  {
    name: "Microban 74",
    author: 'David W. Skinner',
    map: ` ####
 #  #######
 #$ @#   .#
## #$$   .#
#  $  ##..#
#   # #####
###   #
  #####`
  },
  {
    name: "Microban 75",
    author: 'David W. Skinner',
    map: ` #######
## ....##
#   ######
#   $ $ @#
###  $ $ #
  ###    #
    ######`
  },
  {
    name: "Microban 76",
    author: 'David W. Skinner',
    map: ` #####
##   #
#    #####
#  #.#   #
#@ #.# $ #
#  #.#  ##
#    #  #
##  ##$$#
 ##     #
  #  ####
  ####`
  },
  {
    name: "Microban 77",
    author: 'David W. Skinner',
    map: `##########
# @ .... #
#   ####$##
## #  $ $ #
 # $      #
 #   ######
 #####`
  },
  {
    name: "Microban 78",
    author: 'David W. Skinner',
    map: ` #######
##     ##
#  $ $  #
# $ $ $ #
## ### ####
 #@  .....#
 ##     ###
  #######`
  },
  {
    name: "Microban 79",
    author: 'David W. Skinner',
    map: ` #########
 #    #  #
## $#$#  #
#  .$.@  #
#  .#    #
##########`
  },
  {
    name: "Microban 80",
    author: 'David W. Skinner',
    map: `####
#  #######
#  . ## .#
# $#    .#
## ## # .#
 #    #  #
 #### #  #
  # @$ ###
  # $$ #
  #    #
  ######`
  },
  {
    name: "Microban 81",
    author: 'David W. Skinner',
    map: ` #####
 #   #
 # . #
## * #
#  *##
#  @##
## $ #
 #   #
 #####`
  },
  {
    name: "Microban 82",
    author: 'David W. Skinner',
    map: `#####
#   ###
# .   ##
##*#$  #
# .# $ #
# @## ##
#     #
#######`
  },
  {
    name: "Microban 83",
    author: 'David W. Skinner',
    map: `######
#    ##
# $ $ ##
## $$  #
 # #   #
 # ## ##
 #  . .#
 # @. .#
 #  ####
 ####`
  },
  {
    name: "Microban 84",
    author: 'David W. Skinner',
    map: `########
#  ... #
#  ### ##
#  # $  #
## #@$  #
 # # $  #
 # ### #####
 #         #
 #   ###   #
 ##### #####`
  },
  {
    name: "Microban 85",
    author: 'David W. Skinner',
    map: `       ####
 #######  #
 # $      #
 #   $ $  #
 # ########
## # .  #
#  # #  #
#  @ . ##
## # # #
 #   . #
 #######`
  },
  {
    name: "Microban 86",
    author: 'David W. Skinner',
    map: `    ####
  ###  ##
 ## $   #
## $  # #
# @#$$  #
# ..  ###
# ..###
#####`
  },
  {
    name: "Microban 87",
    author: 'David W. Skinner',
    map: `     ####
######  #
#       #
#  ... .#
##$######
# $  #
#   $###
##  $  #
 ## @  #
  ######`
  },
  {
    name: "Microban 88",
    author: 'David W. Skinner',
    map: `     ####
 # ###  #
 # #    #
 # #  # #
 # #$ #.#
 # #  # # #
 # #$ #.# #
   #  # # #
####$ #.# #
# @     # #
#   #  ## #
########`
  },
  {
    name: "Microban 89",
    author: 'David W. Skinner',
    map: `##########
#   ##   #
# $  $@# #
#### # $ #
   #.#  ##
 # #.# $#
 # #.   #
 # #.   #
   ######`
  },
  {
    name: "Microban 90",
    author: 'David W. Skinner',
    map: ` ########
 #  @   #
 # $  $ #
### ## ###
#  $..$  #
#   ..   #
##########`
  },
  {
    name: "Microban 91",
    author: 'David W. Skinner',
    map: `###########
#    .##  #
# $$@..$$ #
#   ##.   #
###########`
  },
  {
    name: "Microban 92",
    author: 'David W. Skinner',
    map: `  ####
  #  #    #####
  #  #    #   #
  #  ######.# #
####  $    .  #
#   $$# ###.# #
#   #   # #   #
######### #@ ##
          #  #
          ####`
  },
  {
    name: "Microban 93",
    author: 'David W. Skinner',
    map: ` #########
##   #   ##
#    #    #
#  $ # $  #
#   *.*   #
####.@.####
#   *.*   #
#  $ # $  #
#    #    #
##   #   ##
 #########`
  },
  {
    name: "Microban 94",
    author: 'David W. Skinner',
    map: `#########
# @ #   #
# $ $   #
##$### ##
#  ...  #
#   #   #
######  #
     ####`
  },
  {
    name: "Microban 95",
    author: 'David W. Skinner',
    map: `########
#@     #
# .$$. #
# $..$ #
# $..$ #
# .$$. #
#      #
########`
  },
  {
    name: "Microban 96",
    author: 'David W. Skinner',
    map: `  ######
  #    #
  #    #
#####  #
#   #.#####
#   $@$   #
#####.#   #
   ## ## ##
   #   $.#
   #   ###
   #####`
  },
  {
    name: "Microban 97",
    author: 'David W. Skinner',
    map: `   ####
   #  ########
#### $ $.....#
#   $   ######
#@### ###
#  $  #
# $ # #
## #  #
 #    #
 ######`
  },
  {
    name: "Microban 98",
    author: 'David W. Skinner',
    map: `#####
#   ## ####
#  $ ### .#
# $   $  .#
## $#####.# ####
# $  # # .###  #
#    # # .#  @ #
###  # #       #
  #### ##     ##
        #######`
  },
  {
    name: "Microban 99",
    author: 'David W. Skinner',
    map: `               #####
               #   #
#######  ####### # #
#     #  #  #      #
#  @  ####  #     ####
#  #    ....## ####  #
#    ##### ## $$ $ $ #
######   #           #
         #  ##########
         ####`
  },
  {
    name: "Microban 100",
    author: 'David W. Skinner',
    map: `#######
# @#  #
#.$   #
#. # $##
#.$#   #
#. # $ #
#  #   #
########`
  },
  {
    name: "Microban 101",
    author: 'David W. Skinner',
    map: `  #####
  #   #
  # # #######
  #  *  #   #
  ## ##   # #
  #     #*  #
### # # # ###
#  *#$+   #
# #   ## ##
#   #  *  #
####### # #
      #   #
      #####`
  },
  {
    name: "Microban 102",
    author: 'David W. Skinner',
    map: `###########
#....#    #
#  #   $$ #
#  @  ##  #
#     ##$ #
######  $ #
     #    #
     ######`
  },
  {
    name: "Microban 103",
    author: 'David W. Skinner',
    map: `  #####
  # . ##
### $  #
# . $#@#
# #$ . #
#  $ ###
## . #
 #####`
  },
  {
    name: "Microban 104",
    author: 'David W. Skinner',
    map: `    #####
#####   #
#    $  #
#  $#$#@#
### #   #
  # ... #
  ###  ##
    #  #
    ####`
  },
  {
    name: "Microban 105",
    author: 'David W. Skinner',
    map: ` #### ####
##  ###  ##
#   # #   #
#  *. .*  #
###$   $###
 #   @   #
###$   $###
#  *. .*  #
#   # #   #
##  ###  ##
 #### ####`
  },
  {
    name: "Microban 106",
    author: 'David W. Skinner',
    map: ` ########
 #      #
 #@   $ #
## ###$ #
# .....###
# $ $ $  #
###### # #
     #   #
     #####`
  },
  {
    name: "Microban 107",
    author: 'David W. Skinner',
    map: `########
#      #
# $*** #
# *  * #
# *  * #
# ***. #
#     @#
########`
  },
  {
    name: "Microban 108",
    author: 'David W. Skinner',
    map: `####     #####
#  ###   #   ##
#    #   #$ $ #
#..# ##### #  #
#  @    # $ $ #
#..#         ##
##   #########
 #####`
  },
  {
    name: "Microban 109",
    author: 'David W. Skinner',
    map: `  #######
# #     #
# # # # #
  # @ $ #
### ### #
#   ### #
# $  ##.#
## $  #.#
 ## $  .#
# ## $#.#
## ## #.#
### #   #
### #####`
  },
  {
    name: "Microban 110",
    author: 'David W. Skinner',
    map: `  ####
  #  #
  # $####
###. .  #
# $ # $ #
#  . .###
####$ #
   # @#
   ####`
  },
  {
    name: "Microban 111",
    author: 'David W. Skinner',
    map: `######
#    ####
#    ...#
#    ...#
######  #
  #  #  #
  # $$ ##
  # @$  #
  # $$  #
  ## $# #
   #    #
   ######`
  },
  {
    name: "Microban 112",
    author: 'David W. Skinner',
    map: ` #####
##   ####
#  $$$  #
# #   $ #
#   $## ##
###  #.  #
  #  #   #
 ##### ###
 #   # ##
 # @....#
 #      #
 #   #  #
 ########`
  },
  {
    name: "Microban 113",
    author: 'David W. Skinner',
    map: `   #####
  ##   #
###  # #
#    . #
#  ## #####
#  . . #  ##
#  # @ $   ###
#####. #  $  #
    ####  $  #
       ## $ ##
        #  ##
        #  #
        ####`
  },
  {
    name: "Microban 114",
    author: 'David W. Skinner',
    map: `######
#    ###
#  # $ #
#  $ @ #
## ## #####
#  #......#
# $ $ $ $ #
##   ######
 #####`
  },
  {
    name: "Microban 115",
    author: 'David W. Skinner',
    map: `    #####
#####   ####
#     #    #
#  #.....  #
##  ## # ###
 #$$@$$$ #
 #     ###
 #######`
  },
  {
    name: "Microban 116",
    author: 'David W. Skinner',
    map: `     #####
   ###   #
####.....#
# @$$$$$ #
#     # ##
#####   #
    #####`
  },
  {
    name: "Microban 117",
    author: 'David W. Skinner',
    map: ` #### ####
 #  ###  ##
 #      @ #
##..###   #
#      #  #
#...#$  # #
# ## $$ $ #
#  $    ###
####  ###
   ####`
  },
  {
    name: "Microban 118",
    author: 'David W. Skinner',
    map: ` #####
##   ##
#  $  ##
# $ $  ##
###$# . ##
  # # .  #
 ## ##.  #
 # @  . ##
 #   #  #
 ########`
  },
  {
    name: "Microban 119",
    author: 'David W. Skinner',
    map: `  ######
  #    ##
 ## ##  #
 # $$ # #
 # @$ # #
 #    # #
#### #  #
#  ... ##
#     ##
#######`
  },
  {
    name: "Microban 120",
    author: 'David W. Skinner',
    map: `      ####
#######  #
# $      ##
# $#####  #
#  @#  #  #
## ##..   #
#  # ..####
# $  ###
# $###
#  #
####`
  },
  {
    name: "Microban 121",
    author: 'David W. Skinner',
    map: ` ######
 # .  #
##$.# #
#  *  #
# ..###
##$ # #####
## ## #   #
#  #### # #
#   @ $ $ #
##  #     #
 ##########`
  },
  {
    name: "Microban 122",
    author: 'David W. Skinner',
    map: `#####
#   ###
# #$  #
# $   #
# $ $ #
# $#  #
#  @###
## ########
#      ...#
#         #
########..#
       ####`
  },
  {
    name: "Microban 123",
    author: 'David W. Skinner',
    map: `########
#      #
# $ $$ ########
##### @##. .  #
    #$  # .   #
    #   #. . ##
    #$# ## # #
    #        #
    #  ###  ##
    #  # ####
    ####`
  },
  {
    name: "Microban 124",
    author: 'David W. Skinner',
    map: `##############
#      #     #
# $@$$ # . ..#
## ## ### ## #
 # #       # #
 # #   #   # #
 # ######### #
 #           #
 #############`
  },
  {
    name: "Microban 125",
    author: 'David W. Skinner',
    map: `      #####
      #   ##
      # $  #
######## #@##
# .  # $ $  #
#        $# #
#...#####   #
#####   #####`
  },
  {
    name: "Microban 126",
    author: 'David W. Skinner',
    map: ` ###########
##.......  #
# $$$$$$$@ #
#   # # # ##
# # #     #
#   #######
#####`
  },
  {
    name: "Microban 127",
    author: 'David W. Skinner',
    map: `## ####
####  ####
 # $ $.  #
## #  .$ #
#   ##.###
#  $  . #
# @ #   #
#  ######
####`
  },
  {
    name: "Microban 128",
    author: 'David W. Skinner',
    map: `  #########
###   #   #
# * $ . . #
#   $ ## ##
####*#   #
 #  @  ###
 #   ###
 #####`
  },
  {
    name: "Microban 129",
    author: 'David W. Skinner',
    map: `  #########
### @ #   #
# * $ *.. #
#   $ #   #
####*#  ###
 #     ##
 #   ###
 #####`
  },
  {
    name: "Microban 130",
    author: 'David W. Skinner',
    map: `#####  #####
#   ####.. #
# $$$      #
#   $#  .. #
### @#  ## #
  #  ##    #
  ##########`
  },
  {
    name: "Microban 131",
    author: 'David W. Skinner',
    map: `#####
#   #
# . #
#.@.###
##.#  #
#  $  #
# $   #
##$$  #
 #  ###
 #  #
 ####`
  },
  {
    name: "Microban 132",
    author: 'David W. Skinner',
    map: `####
# @###
#.*  #####
#..#$$ $ #
##       #
 # # ##  #
 #   #####
 #####`
  },
  {
    name: "Microban 133",
    author: 'David W. Skinner',
    map: ` #######
 #  . .###
 # . . . #
### #### #
#  @$  $ #
#  $$  $ #
####   ###
   #####`
  },
  {
    name: "Microban 134",
    author: 'David W. Skinner',
    map: `        ####
#########  #
#   ## $   #
#  $   ##  #
### #. .# ##
  # #. .#$##
  # #   #  #
  # @ $    #
  #  #######
  ####`
  },
  {
    name: "Microban 135",
    author: 'David W. Skinner',
    map: `#######
#     #####
# $$#@##..#
# #       #
#  $ # #  #
#### $  ..#
   ########`
  },
  {
    name: "Microban 136",
    author: 'David W. Skinner',
    map: ` #######
 #     #
## ###$##
#.$   @ #
# .. #$ #
#.##  $ #
#    ####
######`
  },
  {
    name: "Microban 137",
    author: 'David W. Skinner',
    map: `       ####
      ##  ###
####  #  $  #
#  #### $ $ #
#   ..# #$  #
#  #   @  ###
## #..# ###
 # ## # #
 #      #
 ########`
  },
  {
    name: "Microban 138",
    author: 'David W. Skinner',
    map: `  ####
###  #
#    ###
# # . .#
# @ ...####
# # # #   ##
#   # $$   #
#####  $ $ #
    ##$ # ##
     #    #
     ######`
  },
  {
    name: "Microban 139",
    author: 'David W. Skinner',
    map: ` ####
##  ####
#   ...#
#   ...#
#   # ##
#   #@ #### ####
##### $   ###  #
    #  ##$ $   #
   ###     $$  #
   # $  ##   ###
   #    ######
   ######`
  },
  {
    name: "Microban 140",
    author: 'David W. Skinner',
    map: `######## #####
#  #   ###   #
#      ## $  #
#.# @ ## $  ##
#.#   # $  ##
#.#    $  ##
#. ## #####
##    #
 ######`
  },
  {
    name: "Microban 141",
    author: 'David W. Skinner',
    map: `  ########
  #  # . #
  #   .*.#
  #  # * #
####$##.##
#      $ #
# $ ## $ #
#   @#   #
##########`
  },
  {
    name: "Microban 142",
    author: 'David W. Skinner',
    map: `  ####
  #  #
  #  ####
###$.$  #
#  .@.  #
#  $.$###
####  #
   #  #
   ####`
  },
  {
    name: "Microban 143",
    author: 'David W. Skinner',
    map: `####
#  ####
# $   #
# .#  #
# $# ##
# .  #
#### #
   # #
 ### ###
 #  $  #
## #$# ##
# $ @ $ #
# ..#.. #
###   ###
  #####`
  },
  {
    name: "Microban 144",
    author: 'David W. Skinner',
    map: `   ####
 ###  #####
 # $$ #   #
 # $ . .$$##
 # .. #. $ #
### #** .  #
#  . **# ###
# $ .# .. #
##$$.@. $ #
 #   # $$ #
 #####  ###
     ####`
  },
  {
    name: "Microban 145",
    author: 'David W. Skinner',
    map: `   #####
   # @ #
  ##   ##
###.$$$.###
#  $...$  #
#  $.#.$  #
#  $...$  #
###.$$$.###
  ##   ##
   #   #
   #####`
  },
  {
    name: "Microban 146",
    author: 'David W. Skinner',
    map: ` #######
##  .  ##
# .$$$. #
# $. .$ #
#.$ @ $.#
# $. .$ #
# .$$$. #
##  .  ##
 #######`
  },
  {
    name: "Microban 147",
    author: 'David W. Skinner',
    map: `       #####
########   #
#.   .  @#.#
#  ###     #
## $  #    #
 # $   #####
 # $#  #
 ## #  #
  #   ##
  #####`
  },
  {
    name: "Microban 148",
    author: 'David W. Skinner',
    map: `###########
#  .  #   #
# #.  @   #
#  #..# #######
##  ## $$ $ $ #
 ##           #
  #############`
  },
  {
    name: "Microban 149",
    author: 'David W. Skinner',
    map: ` ####
##  ###
#@$   #
### $ #
 #  ######
 #  $....#
 #  # ####
 ## # #
 # $# #
 #    #
 #  ###
 ####`
  },
  {
    name: "Microban 150",
    author: 'David W. Skinner',
    map: `     ####
 #####  #
 #     $#######
## ## ..#  ...#
# $ $$#$  @   #
#        ###  #
#######  # ####
      ####`
  },
  {
    name: "Microban 151",
    author: 'David W. Skinner',
    map: `   ####
   #  #
 ###  #
##  $ #
#   # #
# #$$ ######
# #   #   .#
#  $  @   .#
###  ####..#
  ####  ####`
  },
  {
    name: "Microban 152",
    author: 'David W. Skinner',
    map: `###### ####
#     #    #
#.##  #$##  #
#   #     #  #
#$  # ###  #  #
# #      #  # #
# # ####  # # #
#. @    $ * . #
###############`
  },
  {
    name: "Microban 153",
    author: 'David W. Skinner',
    map: `#############
#.# @#  #   #
#.#$$   # $ #
#.#  # $#   #
#.# $#  # $##
#.#  # $#  #
#.# $#  # $#
#..  # $   #
#..  #  #  #
############`
  },
  {
    name: "Microban 154",
    author: 'David W. Skinner',
    map: ` ############################
 #                          #
 # ######################## #
 # #                      # #
 # # #################### # #
 # # #                  # # #
 # # # ################ # # #
 # # # #              # # # #
 # # # # ############ # # # #
 # # # # #            # # # #
 # # # # # ############ # # #
 # # # # #              # # #
 # # # # ################ # #
 # # # #                  # #
##$# # #################### #
#. @ #                      #
#############################`
  },
  {
    name: "Microban 155",
    author: 'David W. Skinner',
    map: `    ######               ####
#####*#  #################  ##
#   ###                      #
#        ########  ####  ##  #
### ####     #  ####  ####  ##
#*# # .# # # #     #     #   #
#*# #  #     # ##  # ##  ##  #
###    ### ###  # ##  # ##  ##
 #   # #*#      #     # #    #
 #   # ###  #####  #### #    #
 #####   #####  ####### ######
 #   # # #**#               #
## # #   #**#  #######  ##  #
#    #########  #    ##### ###
# #             # $        #*#
#   #########  ### @#####  #*#
#####       #### ####   ######`
  }
];

export const LEVELS_META = {
  set: 'Microban',
  author: 'David W. Skinner',
  count: LEVELS.length,
  note: 'Microban 关卡集 (155 关, 2000-04 修订版)，作者允许在保留署名的情况下自由分发。',
};
