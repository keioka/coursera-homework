def karatsuba(x, y)

  # base case
  # If x & y is smaller than 10
  x = x.to_i if x.instance_of?(String)
  y = y.to_i if y.instance_of?(String)

  return x * y if x < 10 || y < 10
  
  x = x.to_s
  y = y.to_s

  halfSize = ([x.length, y.length].max / 2).floor
  halfIndex = halfSize
  
  x_half = x.length - halfSize
  y_half = y.length - halfSize

  a = x[0...x_half].to_i
  b = x[x_half..x.length].to_i
  c = y[0...y_half].to_i
  d = y[y_half..y.length].to_i

  ac = karatsuba(a, c)
  bd = karatsuba(b, d)
  z = karatsuba((a-b),(c-d))

  result = ac * (10**(halfIndex*2)) + (ac + bd - z) * (10**halfIndex) + bd
  result
end

p karatsuba(456, 12) == 5472
p karatsuba(23, 56) == 1288
p karatsuba(123, 456) == 56088
p karatsuba(123456, 789012) === 97408265472
p karatsuba(
	3141592653589793238462643383279502884197169399375105820974944592, 
	2718281828459045235360287471352662497757247093699959574966967627
  )