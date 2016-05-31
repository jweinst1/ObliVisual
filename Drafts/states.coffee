#experimental coffeescript

getobj = (len) -> [{} for x in [1..len]]

f =
  who:"do"
  dum:5

match = (input, patt) -> patt.test(input)