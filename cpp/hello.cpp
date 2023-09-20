#include <iostream>


    int sigma_n(int a, int b, int c);
    int sigma_n(int a,int b=0)
    {
        if (a == 0)
            return b;
            else{
        b+=a;
        a--;
        return sigma_n(a, b);
            }
    };

int main()
{
    std::cout<<sigma_n(1000);
return 0;
}