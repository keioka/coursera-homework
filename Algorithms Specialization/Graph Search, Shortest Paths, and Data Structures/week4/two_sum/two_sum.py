from bisect import bisect_left, bisect_right


class TwoSumFinder:
    def __init__(self, input_file=None):
        self._array = []
        numbers = set()
        self._target_values = 0
        if input_file is None:
            for number in input().split():
                numbers.add(int(number))
        else:
            with open(input_file) as file:
                for number in file.read().splitlines():
                    numbers.add(int(number))
        self._array = sorted(numbers)

    def compute_values(self):
        target_values = set()
        for num in self._array:
            low = bisect_left(self._array, -10000 - num)
            high = bisect_right(self._array, 10000 - num)

            print("================")

            print(low)
            print(high)
            print(self._array[low:high])
            for pair_num in self._array[low:high]:
                # print('pair_num', pair_num)
                if pair_num != num:
                    target_values.add(num + pair_num)
                
        return len(target_values)

if __name__ == "__main__":
    two_sum_finder = TwoSumFinder("d.txt")
    target_values = two_sum_finder.compute_values()
    print(target_values)