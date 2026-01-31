import Card from './Card';

const StatCard = ({ icon: Icon, title, value, subtitle, iconColor = 'text-blue-500' }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {Icon && <Icon className={`w-10 h-10 ${iconColor}`} />}
      </div>
    </Card>
  );
};

export default StatCard;
