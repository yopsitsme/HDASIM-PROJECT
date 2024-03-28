#include "Triangular.h"
#include <math.h>
#include <iostream>
using namespace std;
Triangular::Triangular()
{
	width = 0;
	height = 0;
}
Triangular::Triangular(int myWidth, int myHeight)
{
	width = myWidth;
	height = myHeight;
}

double Triangular::triangular_scope()
{
	return 2*sqrt(pow((this->width/2),2)+pow(this->height,2))+this->width;
}

void Triangular::triangular_print()
{
	if (width % 2 == 0 || width > height * 2)
	{
		cout << "The triangular can't be printed";
		return;
	}

	int temp_height = height - 2;
	int temp_width = (width - 2) / 2;
	int group_size = temp_height / temp_width;
	temp_height %= temp_width;
	int asterisks = 1;
	for (int j = (width - asterisks) / 2; j > 0; j--) 
		cout << " ";
	cout << "*" << endl;
	asterisks = 3;
	for (int i = 0; i < temp_width; i++, asterisks+=2)
	{
		for (int j = 0; j < (temp_height + group_size); j++)
		{
			for (int j = (width - asterisks) / 2; j > 0; j--)
				cout << " ";
			for (int j = 0; j < asterisks; j++)
				cout << "*";
			cout << endl;
		}
		temp_height = 0;
	}
	asterisks = width;
	for (int j = 0; j < asterisks; j++)
		cout << "*";
	cout << endl;

}