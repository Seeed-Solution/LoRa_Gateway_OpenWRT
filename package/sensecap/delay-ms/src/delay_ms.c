#include <stdio.h>

int main( int argc, char **argv )
{
    if( argc == 2 )
	{
		usleep( atoi( argv[1] ) * 1000 );
		printf( "sleep %dms\n", atoi( argv[1] ));
	}
	else
	{
		printf( "sleep error!\n" );
	}
	
	return 0;
}