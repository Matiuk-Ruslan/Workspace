using System;
using Terrasoft.Core.DB;
using Terrasoft.Core;

namespace Sandbox.cs
{
    public static class Logger
    {
        public static bool WriteToLog(string service, string body, UserConnection userConnection)
        {
            try
            {
                Insert insert = new Insert(userConnection).Into("Logger")
                    .Set("Execution", Column.Parameter(DateTime.Now))
                    .Set("Service", Column.Parameter(service))
                    .Set("Body", Column.Parameter(body));
                insert.Execute();

                return true;
            }
            catch (Exception) { return false; }
        }
    }
}