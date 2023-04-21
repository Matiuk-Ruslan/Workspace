namespace Terrasoft.Core.Process
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Drawing;
	using System.Globalization;
	using System.Text;
	using Terrasoft.Common;
	using Terrasoft.Configuration;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.Core.Process.Configuration;

	#region Class: CreateRecordsMethodsWrapper

	/// <exclude/>
	public class CreateRecordsMethodsWrapper : ProcessModel
	{

		public CreateRecordsMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("AddMessageToAllExecute", AddMessageToAllExecute);
		}

		#region Methods: Private

		private bool AddMessageToAllExecute(ProcessExecutingContext context) {
			string messageText = "RealtyViewsInserted";
			string sender = "SetRealtyViews";
			MsgChannelUtilities.PostMessageToAll(sender, messageText);
			return true;
		}

		#endregion

	}

	#endregion

}

