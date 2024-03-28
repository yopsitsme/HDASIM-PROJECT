#include "Rectangle.h"

Rectangle::Rectangle()
{
	width = 0;
	height = 0;
}

Rectangle::Rectangle(int myWidth, int myHeight)
{
	width = myWidth;
	height = myHeight;
}

int Rectangle::rectangle_scope()
{
	return (width*2)+(height*2);
}

int Rectangle::rectangle_area()
{
	return width*height;
}

int Rectangle::rectangle_type()
{
	if (width = !height || (width - height <= 5 && height - width >= -5))
		return 1;
	return 0;
}
