using System.Text.Json.Nodes;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Security;

namespace Our.UDUF.StopIt.NotificationHandlers
{
	public class MediaSavingNotification : INotificationHandler<Umbraco.Cms.Core.Notifications.MediaSavingNotification>
	{
		private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
		private readonly ILogger<MediaSavingNotification> _logger;

		public MediaSavingNotification(IBackOfficeSecurityAccessor backOfficeSecurityAccessor, ILogger<MediaSavingNotification> logger)
		{
			_backOfficeSecurityAccessor = backOfficeSecurityAccessor;
			_logger = logger;
		}

		public void Handle(Umbraco.Cms.Core.Notifications.MediaSavingNotification notification)
		{
			try
			{
				//if the event is triggered by scheduled publishing, there is no current user - so we'll default to the root install user
				var currentUserId = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser?.Id ?? -1;

				//if the user is the root user or in the admin group, we can safely bypass the check
				if (currentUserId == -1 || _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser?.Groups.Any(x => x.Alias == Umbraco.Cms.Core.Constants.Security.AdminGroupAlias) == true)
				{
					return;
				}

				var entityWithStopItProperty = notification.SavedEntities.FirstOrDefault(x => x.Properties.FirstOrDefault(y => y.PropertyType.Alias == "udufStopIt") != null);
				if (entityWithStopItProperty != null)
				{
					var stopItPropertyValue = entityWithStopItProperty.Properties.First(x => x.PropertyType.Alias == "udufStopIt").GetValue()?.ToString();

					if (!string.IsNullOrWhiteSpace(stopItPropertyValue))
					{
						var node = JsonNode.Parse(stopItPropertyValue);
						var isProtected = node?["protected"]?.GetValue<bool>() ?? false;

						if (isProtected)
						{
							notification.CancelOperation(new EventMessage("Action rejected", $"You cannot save '{entityWithStopItProperty.Name}', it's been locked down by StopIt", EventMessageType.Error));
						}
					}
				}
			}
			catch (Exception ex)
			{
				const string errorMessage = "Failed to handle the media saving notification";

				_logger.LogError(ex, errorMessage);

				notification.CancelOperation(new EventMessage("Action failed", errorMessage, EventMessageType.Error));
			}
		}
	}
}