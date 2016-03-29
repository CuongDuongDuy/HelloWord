using System;
using Microsoft.Owin.Hosting;

namespace HelloWord.Api
{
    public class Program
    {
        static void Main(string[] args)
        {
            const string baseAddress = "http://localhost:63238/";

            using (WebApp.Start<Startup>(baseAddress))
            {
                Console.WriteLine("Press [enter] to quit...");
                Console.ReadLine();
            }
        }
    }
}
