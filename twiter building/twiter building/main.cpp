#include <string>
#include <iostream>
#include "Triangular.h"
#include "Rectangle.h"
enum USER_SELECTION { rectangle = 1, triangular, exit_program };
using namespace std;
void input_the_size_of_the_tower(int& width, int& height);
int main()
{
	int User_selection = 0;
	int width;
	int height;
	while (User_selection != 3)
	{
		cout << "Choose 1,2 or 3" << endl << "1: a rectangle" << endl << "2: a triangular" << endl << "3: exit"<<endl;
		cin >> User_selection;
		switch (User_selection)
		{
		case rectangle: {
			input_the_size_of_the_tower(width, height);
			Rectangle re(width, height);
			if (re.rectangle_type())
				cout<<"the rectangle scope is:"<<re.rectangle_scope()<<endl;
			else
				cout<<"the rectangle area is:"<<re.rectangle_area()<<endl;
			break; }
		case triangular: {
			input_the_size_of_the_tower(width, height);
			Triangular tr(width, height);
			int sub_choice;
			cout << "Choose a number. 1: the triangular scope 2: print the triangular"<<endl;
			cin >> sub_choice;
			switch (sub_choice)
			{
			case 1:
				cout<<"the triangular scope is:"<<tr.triangular_scope() << endl;
				break;
			case 2:
				tr.triangular_print();
				break;
			default:
				cout << "Invalid input";
				break;
			}
			break; }
		case exit_program:
			return 0;
		default:
			cout << "Invalid number try again";
			break;
		}
	}
	return 0;
}

void input_the_size_of_the_tower(int& width, int& height)
{
	try {
	cout << "Enter tower width"<<endl;
		cin >> width;
		cout << "Enter tower height"<<endl;
		cin >> height;

		if (width <= 0 || height < 2)
		{
			throw "invalid input";
		}
	}
	catch (string err) {
		cout << err;
	}
	return;
}