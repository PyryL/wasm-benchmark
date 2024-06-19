
#include <stdlib.h>

unsigned long fibonacci(int n) {
    if (n > 47) {
        exit(1);
    }
    if (n <= 1) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}
