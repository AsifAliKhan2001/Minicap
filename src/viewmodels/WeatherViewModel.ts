import { BaseViewModel } from "./BaseViewModel";
import { Weather, ForecastData } from "@/models/Weather";
import { ObjectId } from "mongodb";

export class WeatherViewModel extends BaseViewModel<Weather> {
  async load(id: ObjectId): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // TODO: Implement actual API call
      // For now, mock data
      const mockWeather: Weather = {
        id,
        date: new Date().toISOString(),
        city: "Montreal",
        weatherType: "DAILY",
        forecast: []
      };
      
      this.setData(mockWeather);
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to load weather'));
    } finally {
      this.setLoading(false);
    }
  }

  async save(data: Partial<Weather>): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      
      // TODO: Implement actual API call
      // For now, just update local data
      if (this.data) {
        this.setData({
          ...this.data,
          ...data
        });
      }
    } catch (error) {
      this.setError(error instanceof Error ? error : new Error('Failed to save weather'));
    } finally {
      this.setLoading(false);
    }
  }

  // Example of business logic in ViewModel
  getAverageTemperature(): number | null {
    if (!this.data?.forecast.length) return null;
    
    const sum = this.data.forecast.reduce(
      (acc, curr) => acc + curr.temperature,
      0
    );
    return sum / this.data.forecast.length;
  }
}
