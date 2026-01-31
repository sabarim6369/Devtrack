import Card from './Card';

const ChartPlaceholder = ({ title, type = 'bar', height = '300px' }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div 
        className="bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700"
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-gray-500 mb-2">
            {type === 'bar' && '📊'}
            {type === 'pie' && '📈'}
            {type === 'line' && '📉'}
          </div>
          <p className="text-sm text-gray-400">
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart Placeholder
          </p>
          <p className="text-xs text-gray-600 mt-1">Chart library integration point</p>
        </div>
      </div>
    </Card>
  );
};

export default ChartPlaceholder;
